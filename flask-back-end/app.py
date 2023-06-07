from flask import Flask, render_template, request, redirect, url_for, session, make_response
import json, jsonify
import placeholders as dbret
import dbservices.sqlconnect as sqlconn
import traceback
from flask_cors import CORS
from datetime import datetime


app = Flask(__name__)
CORS(app)  # enable CORS for all routes
app.secret_key = 'thisisacomplicatedkey'

# Visual element, for noobs only
@app.route("/")
def index():
    return render_template("index.html")

# test api endpoint
@app.route('/api')
def api():
    return{'hello' : 'world'}, 200, { 'Access-Control-Allow-Origin': '*' }

# post query to set variables once
@app.route('/post/variables', methods=['POST'])
def post_variables():
    querystr = request.json
    print(querystr)
    vars = []
    try:
        session['hostname'] = querystr.get('hostname')
        vars.append(session['hostname'])
        session['portnum'] = querystr.get('portnum')
        vars.append(session['portnum'])
        session['query'] = querystr.get('query')
        vars.append(session['query'])
        session['user'] = querystr.get('user')
        vars.append(session['user'])
        session['password'] = querystr.get('password')
        vars.append(session['password'])
        session['database'] = querystr.get('database')
        vars.append(session['database'])
        print(vars)
    except Exception:
        traceback.print_exc()
    
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=session['query'])
    jsonresponse = json.dumps({"data":"Success", "status":200, "response":"Accepted", "variables": str(vars)})
    # return jsonresponse, 200, { 'Access-Control-Allow-Origin': '*' }
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }


@app.route('/storypoker-create', methods=['POST', 'GET'])
def createStoryPoker():
    #TODO: insert queries here
    querystr = request.json
    print(querystr)
    submitter_email = querystr.get('user_email')
    teammates_emails = querystr.get('email_list')
    submit_time = datetime.now()
    delete_all_query = ""
    insert_all_query = ""
    #TODO: SUBMIT QUERY
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=session['query'])
    print("sp-create", hostname=session["hostname"], portnum=session['portnum'], query=session['query'])
    dbresponse = {"Content":"The backend for creating a SP instance has not been set up"}
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }


@app.route('/storypoker-submit', methods=['POST', 'GET'])
def updateStoryPoker():
    #TODO: insert queries here
    querystr = request.json
    print(querystr)
    submitter_email = querystr.get('user_email')
    teammates_emails = querystr.get('answer')
    submit_time = datetime.now()
    query = "make update query here"
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=session['query'])
    dbresponse = {"Content":"The backend for the submit SP answer has not yet been set up"}
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }


@app.route('/storypoker-result', methods=['POST', 'GET'])
def resultStoryPoker():
    #TODO: insert queries here
    querystr = request.json
    print(querystr)
    submitter_email = querystr.get('user_email')
    fetch_query = ""
    #TODO: update query
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=fetch_query)
    #TODO: remove placeholder
    dbresponse = {"Content":"The backend for the fetch results service has not yet been set-up"}
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }
    

# either set variables or set a query
@app.route('/setvariables', methods=['POST'])
def set_variables():
    querystr = request.json
    print(querystr) 
    if(len(session['hostname']) < 5):
        session['hostname'] = querystr.get('hostname')
        session['portnum'] = querystr.get('portnum')
        session['user'] = querystr.get('user')
        session['password'] = querystr.get('password')
        session['database'] = querystr.get('database')
        return {"content":"received"},200, { 'Access-Control-Allow-Origin': '*' }

    query = querystr.get('hostname')
    session['query'] = query
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=query)
    jsonresponse = json.dumps({"data":"Success", "status":200, "response":"Accepted", "variables": str(vars)})
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }

# get endpoint for any queries. Need to validate queries soon.
@app.route('/get/select', methods=['GET'])
def get_select():
    
    dbresponse = sqlconn.main(hostname=session["hostname"], portnum=session['portnum'], query=session['query'])
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }

# test query for dummy data
@app.route('/test/select', methods=['GET', 'POST'])
def test_select():
    if (request.method == 'POST'):
        querystr = request.json
        print(querystr)
        session['hostname'] = querystr.get('hostname')
        session['portnum'] = querystr.get('portnum')
        session['query'] = querystr.get('query')
        print(session['hostname'], session['portnum'], session['query'])
        
        jsonresponse = json.dumps({"data":"Success", "status":200, "response":"Accepted", 
                                   "hostname":session['hostname'], "postnum":session['portnum'], "query":session['query']})
        return jsonresponse
    
    
    return json.loads(dbret.task_json_str), 200, { 'Access-Control-Allow-Origin': '*' }


# test query for dummy data
@app.route('/test/insert', methods=['GET', 'POST'])
def test_insert():
    if (request.method == 'GET'):
        return json.loads(dbret.simple_json)
    return json.loads(dbret.session_json_str), 200, { 'Access-Control-Allow-Origin': '*' }

# postman test, should work with linked postman code.
@app.route('/postmantest', methods=['GET'])
def postman():

    querystr = request.json
    print(querystr)
    host = querystr.get('hostname')
    port = querystr.get('portnum')
    query = querystr.get('query')
    user = querystr.get('user')
    password = querystr.get('password')
    database = querystr.get('database')
    print(host, port, query, user, password)
    dbresponse = sqlconn.main(host, port, query, user, password, database)
    print(type(dbresponse))
    return dbresponse, 200, { 'Access-Control-Allow-Origin': '*' }

if __name__=='__main__':
    app.run(port=5238)