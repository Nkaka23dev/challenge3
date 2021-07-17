import React, { Component } from 'react' 
import ReactDOM from 'react-dom' 
import './getStyle.css' 
import axios from 'axios'

class Image extends Component { 
    constructor(props) {
        super(props)
        this.state = {
             albumId:"",albumPhotos:[],err:""
        }
    }  
    inputHandler=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleSubmit=e=>{ 
     e.preventDefault()
     const id=this.state.albumId
     const url=`https://albumphotosapi.herokuapp.com/album_photos_by_id/${id}`
     axios.get(url)
     .then(response=>{
        console.log(response.data)
        if(response.data.length===0){
            alert(`No album photos for ${id} ID`)
       }
        this.setState({
            albumPhotos:response.data
        }) 
    })
    .catch(error=>{ 
       if (error){
           alert("Please, Enter Album ID.")
       } 
    })
    }
    // componentDidMount(){}
    render() {
        const {albumPhotos,albumId,err}=this.state
        return ReactDOM.createPortal(
            <div className="container">
                 <div className="wrapper">
                     <div className="album-search">
                <h2 className="title">Album Photos From Django API</h2> 
                <form onSubmit={this.handleSubmit} className="search-box">
                    <input type="text" className="search-control" placeholder="Enter Album ID.."
                     name="albumId"
                    onChange={this.inputHandler} value={albumId}/> 
                    <button className="search-btn btn" type="submit">Get Album Photos by ID
                     </button>
                </form> 
                  <div className="album-result"> 
                  {/* <h2 className="title">Search Result</h2> */}
                  <div id="photo">
                  {
                   albumPhotos.length?
                    albumPhotos.map(
                    alp=>
                    <div className='photo-item' key={alp.id}>
                    <div className="photo-img">
                    <img src={alp.thumbnailUrl}/>
                    </div>
                    <div className="photo-name">
                        <h4>{alp.title}</h4>
                    </div>
                    </div>
                    ):null
                    }
                   {err?console.log(err):null}  
                   </div>
                  </div>
                </div>
                </div>
            </div>,
            document.getElementById('image-portal')
        )
    }
}
export default Image
