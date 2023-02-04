import sys
import pandas as pd
import pymongo
import json
import csv

files = sys.argv[1]
for file in files:
	filepath = file
	data_xls = pd.read_excel(filepath, index_col=None)
	data_xls.to_csv('csvfile.csv')
	client = pymongo.MongoClient("mongodb+srv://john:Jn4wXiyqcn6u1vGo@cluster0.lcwl3.mongodb.net/test")
	df = pd.read_csv("csvfile.csv")
	data = df.to_dict(orient = "tight")
	db = client["ClipperShipGrantData"]
	db.ClipperShipGrantData.insert_one(data)