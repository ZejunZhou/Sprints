import mysql.connector
from mysql.connector import errorcode
import json
from datetime import date, datetime

# JSON serializer for objects not serializable by default json code
def json_serial(obj):
  if isinstance(obj, (datetime, date)):
    return obj.isoformat()
  raise TypeError ("Type %s not serializable" % type(obj))

class DBAccess:

  def __init__(self, hostname="db2", portnum=3306, user="root", password="mc", database="AGDev43"):
    try:
      self.cnx = mysql.connector.connect(user=user, password=password, host=hostname, port=portnum, database=database)
      print(user, password, hostname, portnum, database)
      self.cursor = self.cnx.cursor(dictionary=True)
      self.cnx._open_connection()
    except mysql.connector.Error as err:
      if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("Something is wrong with your user name or password")
      elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("Database does not exist")
      else:
        print(err)
    else:
      self.cursor = self.cnx.cursor(dictionary=True)
  
  def execute_query(self, query):
    dictionary = []

    self.cursor.execute(query)
    for row in self.cursor:
      dictionary.append(row)

    jsonret = json.dumps(dictionary, indent=2, default=json_serial)

    return(jsonret)

  def __del__(self):
    self.cursor.close() 
    self.cnx.close()

def main(hostname="db2", portnum=3306, query="select * from Task;", user="root", password="mc", database="AGDev43"):
  db = DBAccess(hostname, portnum, user, password, database)
  jsonret = db.execute_query(query)
  print(jsonret)
  return jsonret

if __name__ == "__main__":
  main()