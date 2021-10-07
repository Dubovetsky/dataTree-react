import React, { useContext, useEffect, useState } from 'react';
import { Store } from 'utils/store';
import { getRootDataAction } from 'actions';
import { TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Tree from './tree'

const Index = () => {
    let { state, dispatch } = useContext(Store);
    const [expanded, setExpanded] = useState([]);
    const setExpande = (item) => {
        setExpanded([...expanded, item])
    }
    const delExpande = (item) => {
        setExpanded(expanded.filter(e => e != item))
    }
    useEffect(() => {
        getRootDataAction(dispatch)
    }, [])

    let { data } = state.test;
    let root = data[0]
    let list = data.filter(e => e.parrent == root.id)
    return (
        <div>
            {data.length > 0 && 
            <TreeView
                aria-label="multi-select"
                className="view"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                multiSelect
                expanded={expanded}
                sx={{ height: 216, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
            >
                {list.length > 0 &&
                    list.map(el =>{
                        return <Tree key={el.id} nodeId={`${el.id}`} label={el.title} setExpanded={setExpande} delExpanded={delExpande}/>
                    })
                }
            </TreeView>
            }
        </div>
    );
}

export default Index;
