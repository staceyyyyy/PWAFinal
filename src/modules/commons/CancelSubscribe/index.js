import React,{useState} from 'react';
import Toast from '@core_modules/commons/Toast/index';
import {cancelSubscribe} from '../../country/services/graphql/index'
import {TextField,Typography,TextareaAutosize,Container,Snackbar,IconButton} from '@material-ui/core'
import Button from '@common_button';
import useStyles from '@core_modules/unsubscribe/pages/default/style';
const CancelSubscribe = ()=> {
    const styles = useStyles();
    const [value,setValue] = useState()
    const [open,setOpen] = useState(false)
    const [data,setData] = useState({message:"",response:""})
    const [gql] = cancelSubscribe();
    const onChangeHandler =(e)=> {
        setValue(e.target.value)
    }
    const submit = async ()=> {
        const {loading, error, data} = await gql({
            variables: {
                email: value
            }
        })
        setOpen(true)
        setData({ message: data.unSubscribe.status.message, response: data.unSubscribe.status.response });
    }
    return (
        <div>
            <Container>
            <Typography variant="overline" display="block" gutterBottom>
               WHAT DID WE DO WRONG TO MAKE YOU LEAVE US? :(
            </Typography>
            <Typography variant="caption" display="block" gutterBottom>
                Leave us a commment to make us improve our website and services.
            </Typography>
            <TextareaAutosize
                maxRows={4}
                aria-label="maximum height"
                placeholder="Leave a comment"
                style={{ width: 400, height: 200 }}
            />
            </Container>
            <Container>
            <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                onChange={onChangeHandler}
            />
            <Button fullWidth className={styles.button} type="submit" onClick={submit}>
                <Typography variant="span" type="bold" letter="uppercase" color="white">
                    GO UNSUBSCRIBE
                </Typography>
            </Button>
            </Container>
            <Toast
                variant={data.response !== 'Failed' ? 'success' : 'error'}
                message={data.message}
                open={open}
                setOpen={setOpen}
            />
            </div>
    )
}
export default CancelSubscribe