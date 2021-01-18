import sys
from chatterbot import ChatBot
from chatterbot.trainers import ListTrainer
my_bot = ChatBot(name='My_First_Bot', read_only = True, logic_adapters=['chatterbot.logic.BestMatch'],database_uri='sqlite:///database.sqlite3',storage_adapter='chatterbot.storage.SQLStorageAdapter')

small_talk = []
for x in range(3,3+int(sys.argv[1])):
    small_talk.append(sys.argv[(x-1):])


list_trainer = ListTrainer(my_bot)
for item in (small_talk):
    list_trainer.train(item)

