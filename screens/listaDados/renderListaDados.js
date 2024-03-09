import ListaCard from "../../components/listaCard";
import { TouchableOpacity, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import { get } from "../../services/api";

export const RenderListaCliente = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Nome.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodCliente
                    const title = eachName.Nome
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description} type="cliente" codCliente={key}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaVeiculo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Descricao.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodVeic
                    const title = eachName.Descricao
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description} type="veiculo" codVeic={key}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaResponsaveis = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Nome.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodResp
                    const title = eachName.Nome
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaTipoVeiculo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.DescTipo.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTipoVeic
                    const title = eachName.DescTipo
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaTipoContrato = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Periodicidade.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTipoContrato
                    const title = `${eachName.Periodicidade} - R$${eachName.ValorMensal}`
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaJanelaTempo = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => `${eachData.HoraIni} - ${eachData.HoraFim}`.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodTurno
                    const title = `${eachName.HoraIni.slice(0,-3)} - ${eachName.HoraFim.slice(0,-3)}`
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaHorario = ({data, search, openModal}) => {
    const [janelaTempoData, setJanelaTempoData] = useState([])

    const getJanelaTempo = async () => {
        const response = await get("janelaTempo")
        setJanelaTempoData(response.data)
    }

    useEffect(() => {
        getJanelaTempo()
    }, [])

    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => `${eachData.DiaSemana}`.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const janelaTempo = janelaTempoData.find(item => item.CodTurno === eachName.CodTurno);
                    const key = eachName.CodHorario
                    const title = `${eachName.DiaSemana} ${janelaTempo.HoraIni.slice(0,-3)} - ${janelaTempo.HoraFim.slice(0,-3)}`
                    const description = `# ${key}`
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

export const RenderListaPontosComp = ({data, search, openModal}) => {
    const searchLowerCase = search.toLowerCase()
    const names = data.filter((eachData) => eachData.Descricao.toLowerCase().includes(searchLowerCase));
    
    return (
        <>
            {
                names.map((eachName) => {
                    const key = eachName.CodPonto
                    const title = `${eachName.Descricao}`;
                    const description = `${eachName.Cidade} - #${key}`;
                    return (
                        <TouchableOpacity style={styles.button} key={key} onPress={() => openModal(eachName, title)}>
                            <ListaCard title={title} description={description} type="pontosCompostagem" codPonto={key}/>
                        </TouchableOpacity>
                    )
                })
            }
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginHorizontal: 15,
        marginVertical: 10
    }
});