const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");


const AZURE_STORAGE_CONNECTION_STRING = "DefaultEndpointsProtocol=https;AccountName=shotapp;AccountKey=nMnR3gZfmsdNtVBubddN6X7GnU6K3C++5H1TELV1or3XBqOiPOoQ8sNN+pz4pec5fa849QcHwr/k+AStMx2rOA==;EndpointSuffix=core.windows.net";

async function uploadToAzureBlob(folder, file) {
    const containerName = "uploads"
    const accountName = "shotapp"

    try {


        const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
        const containerClient = blobServiceClient.getContainerClient(containerName);

        // Create the container if it does not exist
        await containerClient.createIfNotExists();

        // Blob name with folder
        const blobName = `${folder}/${uuidv4()}-${file.originalname}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        // Upload the file as a blob
        await blockBlobClient.upload(file.buffer, file.buffer.length);
        console.log(`https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`);
        return blobName;
    } catch (error) {
        console.log("Error uploading to Azure Blob", error);
        return null;
    }


}

module.exports = { uploadToAzureBlob };
