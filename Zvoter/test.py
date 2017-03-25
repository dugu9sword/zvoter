from multiprocessing import Process
from threading import Thread, Barrier
import user

"""Test for 4 processes * 10 threads"""
thread_num=10
b = Barrier(thread_num)

def atom():
    b.wait()
    print(user.generate_dumb_phone())

def f():
    ts = []
    for _ in range(thread_num):
        ts.append(Thread(target=atom, args=()))
    for t in ts:
        t.start()
    for t in ts:
        t.join()


if __name__ == '__main__':
    ps = []
    for _ in range(4):
        p = Process(target=f, args=())
        ps.append(p)
    for p in ps:
        p.start()
