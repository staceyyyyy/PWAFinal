import React from 'react';
import Layout from '@layout';
import {getCountriesList} from '@core_modules/country/services/graphql';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Typography,Button} from '@material-ui/core'
const Country = (props)=> {
    const Config = {
        title: "Country",
        header: false, // available values: "absolute", "relative", false (default)
        bottomNav: false,
        pageType: 'other',
        header: 'relative',
    };
    const {loading, data,error} = getCountriesList();
    if (loading) return <></>;
    if (error) return <>error</>;
    const res = data;
    console.log(res)
    return(
        <Layout {...props} pageConfig={Config}>
            <h3>Country list</h3>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell> COUNTRY ID</TableCell>
                            <TableCell  align="center"> COUNTRY NAME</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.countries.map(item=> (
                            <TableRow key={item.name}>
                                <TableCell>
                                    {item.id}
                                </TableCell>
                                <TableCell align="center">{item.full_name_english}</TableCell>
                            </TableRow>
                       ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button href="/unsubscribe">I don't want to receive newsletter anymore</Button>
        </Layout>
    )
}
export default Country