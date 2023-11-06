pip install pymongo

#Views
from pymongo import MongoClient

# Your MongoDB URI
uri = ""

# Create a new client and connect to the server
client = MongoClient(uri)

# Select the "admitwise" database
db = client.admitwise

# Select the "ms_cse" collection
#collection = db.cards
collection = db.data

# Fetch all rows/documents from the collection
cursor = collection.find()

# Convert the cursor to a list of documents
documents = list(cursor)

# Now, 'documents' contains all the rows from the "ms_cse" collection
for document in documents:
    print(document)

# Close the MongoDB connection when done
client.close()





#INSERT
from pymongo import MongoClient

# Your MongoDB URI
uri = "mongodb+srv://kashyapsoni3010:kashyapsoni3010@cluster0.ba1iivd.mongodb.net/?retryWrites=true&w=majority"

# Create a new client and connect to the server
client = MongoClient(uri)

# Select the "admitwise" database
db = client.admitwise

# Select the "data" collection
collection = db.data

# Insert a single document
result = collection.insert_one(data_to_insert_jasleen)

# Print the inserted document's ID
print("Inserted document ID:", result.inserted_id)

# Close the MongoDB connection when done
client.close()
