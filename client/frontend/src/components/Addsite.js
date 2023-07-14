import React, {useState} from 'react'
import axios from 'axios';
import { v4 } from 'uuid';


function Addsite() {
    
    const [site, setSite] = useState('');
    const [issueCount, setIssueCount] = useState('');
    const [id, setId] = useState('');
    const [tool, setTool] = useState('');
    const [file, setFile] = useState(null);


    const handleSubmit = async(e) => {
        e.preventDefault();
        const newId = v4()
        setId(newId)
        console.log("new site info:", id, site, tool)
        try {
            const response = await axios.post('/api/sites', {
                site,
                issueCount,
                id: newId,
                tool
            });

        console.log('Item submitted successfully:', response.data);
        // Reset form fields or show success message to the user
        } catch (error) {
        console.error('Error submitting item:', error);
        // Show error message to the user
        }
  };

  const handleFileChange = (e) =>{
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      
      
    }
    const handleUpload = async (e) => {
        e.preventDefault()
       if(!file) { return; }
        const reader = new FileReader();
        reader.onload = async (e) => {
            const fileData = e.target.result;
            try {
                const jsonData = JSON.parse(fileData);
                const promises = []
                jsonData.forEach((site) => {
                    const id = v4();
                    const siteData = {
                        id,
                        ...site
                    };
                //     promises.push(axios.post('/api/sites', siteData))
                //     let res =  Promise.all(promises) ;
                //     console.log(res.data);
                });

            } catch (err) {
            }
        }

    // formData

}
        
    
    return (
        <div className="container-md App-header">
            <h3>A form for adding site and issueCount:</h3>
            <form  onSubmit={handleSubmit}>
                <input labelFor="site.com" type="text" value={site} onChange={(e) => setSite(e.target.value)} />
                <input type="text" value={issueCount} onChange={(e) => setIssueCount(e.target.value)} />
                <input type="text" value={tool} onChange={(e) => setTool(e.target.value)} />
                
                <button type="submit">Submit</button>
            </form>
            <h3>Or adding report file:</h3>
            <div>
                <input type="file" name="" id="" onChange={(e) => handleFileChange} />
                <button onClick={handleUpload}>Upload</button>
            </div>


        </div>


    )
}

export default Addsite
