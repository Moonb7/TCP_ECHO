import net from 'net';
import { readHeader, writeHeader } from './utils.js';
import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

const HOST = 'localhost'; // 127.0.0.1
const PORT = 5555;

const client = new net.Socket();

client.connect(PORT, HOST, () => {
  console.log(`Connected to the server...`);

  const message = 'Hello';
  const buffer = Buffer.from(message);

  const header = writeHeader(buffer.length, 11);
  const packet = Buffer.concat([header, buffer]);
  client.write(packet);
});

client.on('data', (data) => {
  const buffer = Buffer.from(data);

  const { length, handlerId } = readHeader(data);
  console.log(`length ${length}`);
  console.log(`handlerId ${handlerId}`);

  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID; // 6
  const message = buffer.slice(headerSize);

  console.log(`server 에게 받은 메세지 : ${message}`);
});

client.on('close', () => {
  console.log('Connection closed');
});

client.on('error', (err) => {
  console.log('Client error', err);
});
