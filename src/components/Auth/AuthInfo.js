import React, { useState } from "react";
import { InfoOutlineIcon } from '@chakra-ui/icons'

export default function EditLicense(props){
    const [showForm, setShowForm] = useState(false)

    // document.addEventListener('contextmenu', event => event.preventDefault());


      return (
        
        showForm ? (
            <>
                <div className="infoP">
                    <h3 className="itit">Małe info o stronie</h3>
                    <p className="ip">Strona została wykonana przez: 
                      w ramach konkursu Chopin IT. <b>(można tu dodać więcej info)</b>
                    </p>
                </div>
                <InfoOutlineIcon onClick={() => setShowForm(!showForm)} className="info" color="#fff" w="30px" h="30px" />
            </>
            ) : (
                <>                
                <InfoOutlineIcon onClick={() => setShowForm(!showForm)} className="info" color="#fff" w="30px" h="30px" />
                </>

            )
      );
}