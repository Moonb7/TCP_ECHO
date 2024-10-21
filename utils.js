import { HANDLER_ID, TOTAL_LENGTH_SIZE } from './constants.js';

/**
 * 헤더를 읽는 함수
 * @param {*} buffer
 * @returns
 */
export const readHeader = (buffer) => {
  return {
    length: buffer.readUInt32BE(0), // 빅인디안(순서 대로 읽음), 리틀 인디안(역순으로 읽음) 개념 찾아보기 (0)은 "0번쨰 위치에서 시작하겠다"라는 의미로만 일단 알아두기
    handlerId: buffer.readUInt16BE(TOTAL_LENGTH_SIZE), // 시작위치는 위에 4바이트가 끝나는 위치부터 읽기 시작
  };
};

/**
 *
 * @param {*} length 메세지의 길이
 * @param {*} handlerId
 * @returns
 */
export const writeHeader = (length, handlerId) => {
  const headerSize = TOTAL_LENGTH_SIZE + HANDLER_ID; // 6
  const buffer = Buffer.alloc(headerSize); // alloc()함수를 통해 크기를 지정하고 버퍼 객체를 만들수 있습니다.
  buffer.writeUint32BE(length + headerSize, 0);
  buffer.writeUint16BE(handlerId, TOTAL_LENGTH_SIZE);

  return buffer;
};
