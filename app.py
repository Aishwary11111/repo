import base64
from io import BytesIO
from datetime import datetime
from flask import Flask,request,jsonify
from flask_cors import CORS,cross_origin
from keras.models import load_model
import numpy as np
from PIL import Image
from flask_pymongo import PyMongo

app = Flask(__name__)
cors=CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/test'
mongo = PyMongo(app)
res = mongo.db.result

model=load_model("Saved_model/dog_breed_identification_resnet.h5")

@app.route('/livepredict', methods=['POST'])
def classify():
    # Get the frame from the request
    frame = request.json["frame"]
    img = Image.open(BytesIO(base64.b64decode(frame.split(",")[1])))
    # Perform your classification on the frame and get the result as an integer
    prediction=np.squeeze(model.predict(np.expand_dims(img.resize((180,180)),0)))
    preds=0
    x=max(prediction)
    if x>0.999:
        preds= int(np.argmax(prediction))
    else:
        preds=-1
    print(preds)
    if preds!=-1:
        def insert_document(document):
        # Check the collection size
            collection_size = res.count_documents({})
        
        # If collection size is less than 10, insert the document
            if collection_size < 10:
                res.insert_one(document)
            else:
                # Find the oldest document and remove it
                oldest_document = res.find_one({},sort=[('date', 1)])
                res.delete_one({'date': oldest_document['date']})
                
                # Insert the latest document
                res.insert_one(document)
        document = {
            'index':preds,
            'date': datetime.now()
        }
        insert_document(document)
    # Return the classification result as JSON
    return jsonify({'result':preds})


@app.route('/preprocess',methods=['POST'])
@cross_origin()
def preprocess():
    img = request.files['image']
    image=Image.open(img)
    a=np.squeeze(model.predict(np.expand_dims(image.resize((180,180)),0)))
    if max(a)>0.999:
        preds=int(np.argmax(a));
    else:
        preds=-1
    print(preds)
    if preds!=-1:
        def insert_document(document):
        # Check the collection size
            collection_size = res.count_documents({})
        
        # If collection size is less than 10, insert the document
            if collection_size < 10:
                res.insert_one(document)
            else:
                # Find the oldest document and remove it
                oldest_document = res.find_one({},sort=[('date', 1)])
                res.delete_one({'date': oldest_document['date']})
                
                # Insert the latest document
                res.insert_one(document)
        document = {
            'index': preds,
            'date': datetime.now()
        }
        insert_document(document)
    return jsonify({"value":preds})

if __name__ == '__main__':
    app.run(host='localhost',port=5001)