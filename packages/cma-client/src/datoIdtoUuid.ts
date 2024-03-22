import { stringify } from 'uuid';
function fromBase64toUint8Array(base64String: string) {
  // Check if Buffer is available, indicating a Node.js environment
  if (typeof Buffer !== 'undefined') {
    // Use Buffer to convert base64 to a Uint8Array
    return new Uint8Array(Buffer.from(base64String, 'base64'));
  } else {
    // Assuming a browser environment if Buffer is not available
    // Use atob to decode base64 to a binary string
    const binaryString = atob(base64String);

    // Create a Uint8Array of the same length as the binary string
    const bytes = new Uint8Array(binaryString.length);

    // Convert each character to its byte value
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
}

export const datoIdToUuid = (b64url: string): string => {
  // Undo the URL encoding we did in generateId()
  const reversedUrlEncoding: string = `${b64url
    .replace(/-/g, '+')
    .replace(/_/g, '/')}==`;

  // Decode the B64 back into a Uint8Array
  const encodedAsBuffer = fromBase64toUint8Array(reversedUrlEncoding);

  // Stringify the UUID into a hex string
  const stringified = stringify(encodedAsBuffer);

  return stringified;
};
