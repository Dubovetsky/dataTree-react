import React, { useContext, useState } from 'react';
import { Store } from 'utils/store';
import { getDirDataAction } from 'actions';
import TreeItem from '@mui/lab/TreeItem';
import FolderIcon from '@mui/icons-material/Folder';
import DescriptionIcon from '@mui/icons-material/Description';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

  
function StyledTreeItem(props) {
    const {
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;
  
    return (
        <TreeItem
            label={
                <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
                    <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
                        {labelText}
                    </Typography>
                    <Typography variant="caption" color="inherit">
                        {labelInfo}
                    </Typography>
                </Box>
            }
            {...other}
        />
    );
}
  
StyledTreeItem.propTypes = {
    labelIcon: PropTypes.elementType.isRequired,
    labelInfo: PropTypes.string,
    labelText: PropTypes.string.isRequired,
};

const Tree = (props) => {
    let [isOpen, setIsOpen] = useState(true);
    let [isFetch, setFetch] = useState(false);
    const setBlock = () =>{
        setFetch(true)
    }
    let { state, dispatch } = useContext(Store);
    let { data } = state.test;
    let list = data.filter(e => e.parrent == props.nodeId)
    let open = async () => { 
        if(!isFetch && props.label.indexOf(".") < 0) {
            await getDirDataAction(dispatch, props.nodeId);
            setBlock();
            props.setExpanded(props.nodeId);
        } else{
            if(isOpen) {
                props.delExpanded(props.nodeId)
            } else {
                props.setExpanded(props.nodeId);
            }
            setIsOpen(!isOpen)
        }
    }
    return (
        <StyledTreeItem labelIcon={props.label.indexOf(".") >= 0 ? DescriptionIcon : FolderIcon} nodeId={props.nodeId} labelText={props.label} onClick={open}>
            {list.length > 0 &&
                list.map(el =>{
                    return <Tree key={el.id} nodeId={`${el.id}`} label={el.title} setExpanded={props.setExpanded} delExpanded={props.delExpanded}/>
                })
            }
        </StyledTreeItem>
    );
} 

export default Tree;
