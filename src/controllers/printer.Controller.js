import axios from 'axios';
import net from 'net';

// Configura la IP de la impresora Zebra ZT231
const printerIp = '172.25.26.67'; // Cambia esto con la IP de tu impresora
const printerPort = 6101; // Puerto típico para impresoras Zebra

// Función para generar el comando ZPL
const generateZPL = (text) => {
  return `
^XA
^FO50,50
^A0N,50,50
^FD${text}^FS
^XZ
`;
};

// Función para imprimir usando HTTP (si la impresora soporta HTTP)
const printZPLViaHttp = async (zplCommand) => {
  try {
    const response = await axios.post(`http://${printerIp}/print`, {
      zpl: zplCommand,
    });
    console.log('Impresión enviada a la impresora');
  } catch (error) {
    console.error('Error al enviar la impresión:', error);
  }
};

// Función para imprimir usando socket (si usas el puerto 9100)
const printZPLViaSocket = (zplCommand) => {
  const client = new net.Socket();
  client.connect(printerPort, printerIp, () => {
    console.log('Conectado a la impresora');
    client.write(zplCommand);
  });

  client.on('data', (data) => {
    console.log('Respuesta de la impresora:', data.toString());
    client.destroy();
  });

  client.on('close', () => {
    console.log('Conexión cerrada');
  });
};

// Exportar las funciones
export { generateZPL, printZPLViaHttp, printZPLViaSocket };