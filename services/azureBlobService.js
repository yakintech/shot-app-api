const { BlobServiceClient } = require("@azure/storage-blob");
const { v4: uuidv4 } = require("uuid");


const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING

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
