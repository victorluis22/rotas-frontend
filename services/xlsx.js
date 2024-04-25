import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import * as Sharing from 'expo-sharing';
import { getXLSXContent } from "./api";

const getContent = async (empresaId) => {
    var wb = XLSX.utils.book_new();

    const { data } = await getXLSXContent(empresaId);

    var ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Clientes Rotas");

    return XLSX.write(wb, { type: "base64", bookType: "xlsx" });
};
  
const createXLSX = async (empresaId) => {
    const wbout = await getContent(empresaId);

    const uri = FileSystem.documentDirectory + "XLSX/clientes.xlsx";

    if (
        !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "XLSX")).exists
    ) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "XLSX");
    }

    FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

export const exportXLSX = async (empresaId) => {
    await createXLSX(empresaId);

    await Sharing.shareAsync(
        FileSystem.documentDirectory + "XLSX/clientes.xlsx", 
        {dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
    );
}