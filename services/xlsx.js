import * as FileSystem from "expo-file-system";
import * as XLSX from "xlsx";
import * as Sharing from 'expo-sharing';
import { getXLSXContent } from "./api";

const getClientContent = async (empresaId) => {
    var wb = XLSX.utils.book_new();

    const { data } = await getXLSXContent(empresaId);

    var ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Clientes Rotas");

    return XLSX.write(wb, { type: "base64", bookType: "xlsx" });
};

const getContentRouteXLSX = async (routeJSON) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([['Parada', 'Cliente Inicial', 'Endereço Inicial', 'Cliente Final', 'Endereço Final', 'Horário', 'Demanda Acumulada']]);
    
    routeJSON.forEach((item, index) => {
      const row = [
        `${index + 1}°`,
        item.From.name,
        item['Departure address'],
        item.To.name,
        item['Destination address'],
        item['End of service'], 
        item['Accumulated demand']
      ];
      XLSX.utils.sheet_add_aoa(ws, [row], { origin: -1 });
    });
  
    XLSX.utils.book_append_sheet(wb, ws, 'Rotas');
    
    return XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
}

const getContentAllRouteXLSX = (data) => {
    const workbook = XLSX.utils.book_new();

    // Função para criar uma planilha com base nos dados e no tipo de veículo
    const createSheet = (vehicleType) => {
        const sheetData = data.route[vehicleType];
        const sheet = XLSX.utils.aoa_to_sheet([
            ['Parada', 'Dia da Semana', 'Cliente Inicial', 'Endereço Inicial', 'Cliente Final','Endereço Final', 'Horário', 'Demanda Acumulada']
        ]);

        let row = 1;
        Object.keys(sheetData).forEach((day) => {
            const route = sheetData[day].Route;
            route.forEach((item, index) => {
                XLSX.utils.sheet_add_aoa(sheet, [
                    [`${index + 1}°`, day, item.From.name, item['Departure address'], item.To.name, item['Destination address'], item['End of service'], item['Accumulated demand']]
                ], {  origin: -1  });
                row++;
            });
        });

        return sheet;
    };

    // Adiciona uma nova planilha para cada tipo de veículo
    Object.keys(data.route).forEach((vehicleType) => {
        const sheet = createSheet(vehicleType);
        XLSX.utils.book_append_sheet(workbook, sheet, vehicleType);
    });

    // Salva a planilha
    return XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
};

const createClientXLSX = async (empresaId) => {
    const wbout = await getClientContent(empresaId);

    const uri = FileSystem.documentDirectory + "XLSX/clients.xlsx";

    if (
        !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "XLSX")).exists
    ) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "XLSX");
    }

    FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

const createRouteXLSX = async (routeJSON) => {
    const wbout = await getContentRouteXLSX(routeJSON);

    const uri = FileSystem.documentDirectory + "XLSX/route.xlsx";

    if (
        !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "XLSX")).exists
    ) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "XLSX");
    }

    FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

const createAllRouteXLSX = async (routeJSON) => {
    const wbout = await getContentAllRouteXLSX(routeJSON);

    const uri = FileSystem.documentDirectory + "XLSX/route_all.xlsx";

    if (
        !(await FileSystem.getInfoAsync(FileSystem.documentDirectory + "XLSX")).exists
    ) {
        await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "XLSX");
    }

    FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
    });
};

export const exportClientXLSX = async (empresaId) => {
    await createClientXLSX(empresaId);

    await Sharing.shareAsync(
        FileSystem.documentDirectory + "XLSX/clients.xlsx", 
        {dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
    );
}

export const exportRouteXLSX = async (routeJSON) => {
    await createRouteXLSX(routeJSON);

    await Sharing.shareAsync(
        FileSystem.documentDirectory + "XLSX/route.xlsx", 
        {dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
    );
}

export const exportAllRouteXLSX = async (routeJSON) => {
    await createAllRouteXLSX(routeJSON);

    await Sharing.shareAsync(
        FileSystem.documentDirectory + "XLSX/route_all.xlsx", 
        {dialogTitle: 'Compartilhe ou copie seu arquivo via:'}
    );
}