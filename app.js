//https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-nodejs?tabs=environment-variable-windows

const { BlobServiceClient } = require('@azure/storage-blob');
const { v1: uuidv1 } = require('uuid');

const config = require('./config');
const AZURE_STORAGE_CONNECTION_STRING = config.connectionString;

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw Error('Azure Storage Connection string not found');
}

async function createContainer(name) {
  console.log('Azure Blob storage v12 - JavaScript quickstart sample');

  // Create the BlobServiceClient object which will be used to create a container client
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

  // Create a unique name for the container
  const containerName = name + uuidv1();

  console.log('\nCreating container...');
  console.log('\t', containerName);

  // Get a reference to a container
  const containerClient = blobServiceClient.getContainerClient(containerName);
  // Create the container
  const createContainerResponse = await containerClient.create();
  console.log('Container was created successfully. requestId: ', createContainerResponse.requestId);
}

async function deleteContainer(name) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(name);
  console.log('\nDeleting container...');

  const deleteContainerResponse = await containerClient.delete();
  console.log('Container was deleted successfully. requestId: ', deleteContainerResponse.requestId);
}

async function listBlobs(container) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(container);
  console.log('\nListing blobs...');

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log('\t', blob.name);
  }
}

async function deleteBlob(container, blob) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerClient = blobServiceClient.getContainerClient(container);
  console.log('\nDeleting blobs...');

  containerClient.deleteBlob(blob);
}

// createContainer('testContainer')
//   .then(() => console.log('Done'))
//   .catch((ex) => console.log(ex.message));

// deleteContainer('quickstart30cc5390-d669-11ec-92ab-13fde622f0ba')
//   .then(() => console.log('Done'))
//   .catch((ex) => console.log(ex.message));

listBlobs('test')
  .then(() => console.log('Done'))
  .catch((ex) => console.log(ex.message));
// deleteBlob('test', 'template.zip')
//   .then(() => console.log('Done'))
//   .catch((ex) => console.log(ex.message));
