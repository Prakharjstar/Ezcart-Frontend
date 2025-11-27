import { createTheme } from "@mui/material";
import { DEFAULT_ECDH_CURVE } from "tls";


const customTheme= createTheme({
    palette:{
        mode:"light",
        primary:{
            main:"#00927c"
        },
        secondary:{
            main:"#EAF0F1"
        }
    }
})

export default customTheme;