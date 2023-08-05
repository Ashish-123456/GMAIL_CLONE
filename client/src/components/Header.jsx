
import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'
    import * as React from 'react';
    import Button from '@mui/material/Button';
    import Dialog from '@mui/material/Dialog';
    import DialogActions from '@mui/material/DialogActions';
    import DialogContent from '@mui/material/DialogContent';
    import DialogContentText from '@mui/material/DialogContentText';
    import DialogTitle from '@mui/material/DialogTitle';
import { gmailLogo } from '../constants/constant';
import Searchh from './Search';
import { useState } from 'react';
import axios from 'axios';


const StyledAppBar = styled(AppBar)`
    background: #f5F5F5;
    box-shadow: none;
`;

const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 80px;
    border-radius: 8px;
    min-width: 690px;
    max-width: 720px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    & > div {
        width: 100%
    }
`

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: end;
    & > svg {
        margin-left: 20px;
    }
`

const Header = ({ toggleDrawer }) => {
    
        const[searchData,setSearchData]=useState("");
        const[result,setResult]=useState([]);
        const [open, setOpen] = useState(false);

      
        const handleClose = () => {
          setOpen(false);
        };
        const handleSearch=async ()=> {
            setOpen(true);
            try{
                const response=await axios.get("http://localhost:8000/search",{
                    params:{to:searchData}
                } );
                console.log(response);
                setResult(response);
            }catch{
                console.log("No Data Present");
            }
          }
    
    return (<>
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper >
                <button onClick={()=>handleSearch()}>
                <Search color="action" />
                </button>
                    
                    <InputBase onChange={(e)=>setSearchData(e.target.value)}/>
                    <Tune  color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="action" />
                    <SettingsOutlined color="action" />
                    <AppsOutlined color="action" />
                    <AccountCircleOutlined color="action" />
               </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
        <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
         { result.data?.map(email => (
                        <Searchh 
                            email={email} 
                            key={email.id}
                            setStarredEmail={email.starred} 
                        />
                    ))
         }
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
        </>
    )
}

export default Header;