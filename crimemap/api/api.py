from flask import Flask, render_template, jsonify, request
import mysql.connector
from flask_cors import CORS, cross_origin

app = Flask(__name__)

cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

def send_bad_request(response):
    data_list = {}
    data_list['success'] = False
    data_list['errors'] = [response]
    data_list['data'] = []
    resp = jsonify(data_list)
    resp.status_code = 400
    return resp

def send_internal_server_error(response):
    data_list = {}
    data_list['success'] = False
    data_list['errors'] = [response]
    data_list['data'] = []
    resp = jsonify(data_list)
    resp.status_code = 500
    return resp

def get_city_area_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT * FROM CityArea")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_crime_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT * FROM Crime")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_incidents_query(args):
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        id = args.get('id')
        print(id)
        if id == None:
            query = ("SELECT * FROM Incidents")
        else:
            id = '%' + id + '%'
            query = ("SELECT * FROM Incidents WHERE CAST(DR_Number AS CHAR(255)) LIKE '"+ id +"'")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_inc_crime_query(args):
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        crime = args.get('crime')
        print(crime)
        if crime is None or crime =='':
            query = ("SELECT * FROM Incidents i join Crime c on i.Crime_Code = c.Crime_Code")
        else:
            crime = '%' + crime + '%'
            query = ("SELECT * FROM Incidents i join Crime c on i.Crime_Code = c.Crime_Code WHERE c.Crime_Description LIKE '"+ crime +"'")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_local_premise_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT * FROM LocalPremise")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_weapon_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT * FROM Weapon")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_query1_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT ca.Area_Name, AVG(i.Victim_Age) AS Average_Age, COUNT(*) AS Incident_Count FROM Incidents i JOIN CityArea ca ON i.Area_Number = ca.Area_Number  GROUP BY ca.Area_Name ORDER BY Average_Age DESC, Incident_Count")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp

def get_query2_query():
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor(dictionary=True)
        query = ("SELECT ca.Area_Name, i.Victim_Descent, COUNT(*) AS Total_Crimes, COUNT(*) * 100.0 / (SELECT COUNT(*) FROM Incidents) AS Crime_Percentage FROM Incidents i JOIN CityArea ca ON i.Area_Number = ca.Area_Number JOIN Crime c ON i.Crime_Code = c.Crime_Code GROUP BY ca.Area_Name, i.Victim_Descent ORDER BY ca.Area_Name, i.Victim_Descent")
        cursor.execute(query)
        data = []
        for row in cursor:
            data.append(row)
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    data_list = {}
    data_list['success'] = True
    data_list['errors'] = []
    data_list['data'] = data
    resp = jsonify(data_list)
    resp.status_code = 200
    return resp



@app.route('/get/city_area')
def get_city_area():
    return get_city_area_query()

@app.route('/get/crime')
def get_crime():
    return get_crime_query()

@app.route('/get/incidents')
def get_incidents():
    args = request.args
    return get_incidents_query(args)

@app.route('/get/inc_crime')
def get_inc_crime():
    args = request.args
    return get_inc_crime_query(args)

@app.route('/get/local_premise')
def get_local_premise():
    return get_local_premise_query()

@app.route('/get/weapon')
def get_weapon():
    return get_weapon_query()

@app.route('/get/query1')
def get_query1():
    return get_query1_query()

@app.route('/get/query2')
def get_query2():
    return get_query2_query()

@app.route('/post/incidents', methods=['POST'])
def create_incident():
    try:
        data = request.json['data']
    except Exception as e:
        print(e)
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        if data['DR_Number'] is None or data['Latitude'] is None:
            return send_internal_server_error("error")
        cursor = mydb.cursor()
        print(data['Crime_Code_Description'])
        query = "INSERT INTO Incidents (DR_Number, Area_Number, Date_Occured, Victim_Sex, Victim_Age, Victim_Descent, Date_Reported, Crime_Code, Latitude, Longitude, Weapon_Code, Premise_Code) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
        values = (data['DR_Number'], data['Area_Number'], data['Date_Occured'], data['Victim_Sex'], data['Victim_Age'], data['Victim_Descent'], data['Date_Reported'], data['Crime_Code'], data['Latitude'], data['Longitude'], data['Weapon_Code'], data['Premise_Code'])
        cursor.execute(query, values)
        mydb.commit()
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    return jsonify({"success": True, "errors": []}), 200

@app.route('/delete/<int:DR_Number>', methods=['DELETE'])
def delete_incident(DR_Number):
    if (DR_Number == None):
        return jsonify({"Success": False, "errors": ['Bad Request']}), 400
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor()
        query = "DELETE FROM Incidents WHERE DR_Number=" + str(DR_Number);
        cursor.execute(query)
        mydb.commit()
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    return jsonify({"success": True, "errors": []}), 200

@app.route('/put/incidents/<int:dr_number>', methods=['PUT'])
def update_incident(dr_number):
    if (dr_number == None):
        return jsonify({"Success": False, "errors": ['Bad Request']}), 400
    try:
        data = request.json['data']
        print(data)
    except Exception as e:
        print(e)
    try:
        mydb = mysql.connector.connect(
            host="104.155.168.44",
            user="root",
            passwd="crimemap",
            database="crimemap"
        )
        cursor = mydb.cursor()
        update_query = ("UPDATE Incidents SET Area_Number = %s, Date_Occured = %s, Victim_Sex = %s, Victim_Age = %s, Victim_Descent = %s, Date_Reported = %s, Crime_Code = %s, Latitude = %s, Longitude = %s, Weapon_Code = %s, Premise_Code = %s WHERE DR_Number = %s")
        values = (data['Area_Number'], data['Date_Occured'], data['Victim_Sex'], data['Victim_Age'], data['Victim_Descent'], data['Date_Reported'], data['Crime_Code'], data['Latitude'], data['Longitude'], data['Weapon_Code'], data['Premise_Code'], dr_number)
        cursor.execute(update_query, values)
        mydb.commit()
        cursor.close()
        mydb.close()
    except Exception as e:
        error = e.args[0].message
        return send_internal_server_error(error)
    return jsonify({"success": True, "errors": []}), 200

if __name__ == "__main__":
    app.run(host='127.0.0.1', threaded=True)