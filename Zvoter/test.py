import random
import datetime
import multiprocessing
from threading import Lock
import threading
import my_db
import os
import sys

cache = my_db.cache


# 获取唯一id的方法
class OnlyID:
    """一个获取唯一id的类，单例模式，使用方式有两种：
    1. 创建一个类实例，然用使用这个实例调用get_id方法返回一个唯一id。
    2. 直接使用类的静态方法:OnlyID.get() 返回一个唯一的id。
    return: 一个长度为20的字符串格式的id（纯数字组成的字符串）
    注意，此方法在多进程下可能会有问题，需要加入os.gitpid()获取进程号进行区别
    """

    def __init__(self):
        pass

    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, 'instance'):
            obj = super(OnlyID, cls).__new__(cls)
            obj.id_list = []
            pid = os.getpid()
            pid_hex = hex(pid).lstrip("0x")
            obj.pid_hex = pid_hex
            cls.instance = obj
            cls.instance.fill()
        return cls.instance

    def get_id(self):
        """返回一个唯一的id """
        if len(self.id_list) < 2:
            self.fill()
        else:
            pass
        """
        此段代码在多进程下有问题。
        str1 = datetime.datetime.now().strftime('%y%m%d%H%M%S%f')  # 2位数的年份的日期，格式化到微秒
        """
        str1 = datetime.datetime.now().strftime('%y%m%d%H%M%S')
        str2 = self.id_list.pop()
        the_id = str1 + str(str2)
        alist = cache.get("alist")
        if alist is None:
            cache.set("alist", [the_id], timeout=60 * 10)
        else:
            if the_id not in alist:
                alist.append(the_id)
                cache.set("alist", alist, timeout=60 * 10)
            else:
                print("重复的号码 {}".format(the_id))
                raise KeyError("重复的号码 {}".format(the_id))
                sys.exit(1)
        return the_id

    @staticmethod
    def get():
        """静态方法，返回一个唯一的id ,这是暴露给外界使用的获取并使用此id的方法，
        此id将会被从待用id序列中被剔除"""
        return OnlyID().get_id()

    @staticmethod
    def check_next():
        """
        静态方法，获取一个id但并不从待用id序列中取走
        """
        obj = OnlyID()
        if len(obj.id_list) < 2:
            obj.fill()
        else:
            pass
        # 2位数的年份的日期，格式化到毫秒
        str1 = datetime.datetime.now().strftime('%y%m%d%H%M%S%f')
        str2 = obj.id_list[-1]
        return str1 + str(str2)

    def fill(self):
        """重新填充备用的id"""
        while len(self.id_list) < 20:  # 最大备用id数设置
            num = self.pid_hex
            zfill = 8 - len(num)
            num = int("f" * zfill, base=16)
            self.id_list.clear()
            for i in range(num):
                self.id_list.append(self.pid_hex + hex(i).lstrip("0x").zfill(zfill))




def xx(p, t):
    the_id = OnlyID.get()
    #print("第{}进程，第{}线程生成的号码是：{}".format(p + 1, t + 1, the_id))


def tt(p):
    for i in range(1000):
        t = threading.Thread(target=xx, args=(p, i))
        t.start()


if __name__ == "__main__":

    for i in range(10):
        p = multiprocessing.Process(target=tt, args=(i,))
        p.start()
