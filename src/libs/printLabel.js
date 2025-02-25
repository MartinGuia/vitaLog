import { generateZPL, printZPLViaHttp, printZPLViaSocket } from '../controllers/printer.Controller.js';

export const printLabel = async (req, res) => {
    const { text } = req.body;
  
    if (!text) {
      return res.status(400).json({ message: 'Se requiere texto para imprimir' });
    }
  
    // Generar el comando ZPL
    const zplCommand = generateZPL(text);
  
    // Puedes elegir usar una de las dos opciones de impresión
    // Si la impresora soporta HTTP, usa printZPLViaHttp
    // Si la impresora usa sockets, usa printZPLViaSocket
    printZPLViaSocket(zplCommand); // Cambia a printZPLViaHttp si es necesario
  
    return res.status(200).json({ message: 'Impresión solicitada', zpl: zplCommand });
};

export default printLabel;