import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import './Invite.css'

import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { MdOutlineDragHandle } from 'react-icons/md'
import VisibilityIcon from '@mui/icons-material/Visibility'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import Fab from '@mui/material/Fab'
import { FiSend } from 'react-icons/fi'
import { toast, ToastContainer } from 'react-toastify'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

function Invite() {

  const [myOptions, setMyoptions] = useState()
  const [quotes, setQuotes] = useState([])
  const [employees, setEmployees] = useState([])

  const getMyoptions = async () => {
    await axios.get('http://localhost:5000/employees')
      .then((res) => {
        const tempArray = []
        const data = res.data
        setEmployees(data)
        data.forEach(element => {
          tempArray.push({
            label: `${element.name}`,
            value: `${element.id}`
          })
        });
        setMyoptions(tempArray)
      })
  }

  const getQuotes = async () => {
    await axios.get('http://localhost:5000/quotes')
      .then((res) => {
        const data = res.data
        setQuotes(data)
      })
  }

  const addQuote = (e) => {
    if (employees) {
      let value = parseInt(e.value)
      const source = employees.find(x => x.id === value)
      axios.post('http://localhost:5000/quotes', source)
      .catch(()=> {
        toast.error('Already exists', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      })
      getQuotes()
    }
  }

  const handleOnDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return
    const items = Array.from(quotes)
    const [recordedItem] = items.splice(source.index, 1)
    items.splice(destination.index, 0, recordedItem)

    // update users value each time drag ends
    setQuotes(items)
  }

  const deleteQuote = async (id) => {
    await axios.delete('http://localhost:5000/quotes/' + id)
    getQuotes()
  }

  useEffect(() => {
    getMyoptions()
    getQuotes()
  }, [])

  return (
    <div id='invite'>
      <div className='users-heading'>
        <span><h1>Invites List</h1></span>
        <span>
          <Tooltip arrow title='Send Invites'>
            <Fab color="primary" size='medium'>
              <FiSend />
            </Fab>
          </Tooltip>
        </span>
      </div>

      <Select 
      className='add-invite' 
      options={myOptions} 
      placeholder='select users to invite' 
      isSearchable onChange={(e) => { addQuote(e) }} 
      />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>+</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='users'>
              {(provided) => (
                <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                  {
                    quotes.map(({ id, name, username, email, phone, website }, index) => {
                      return (
                        <Draggable key={id} draggableId={id.toString()} index={index}>
                          {(provided) => (
                            <TableRow {...provided.draggableProps} ref={provided.innerRef}>
                              <TableCell {...provided.dragHandleProps} ref={provided.innerRef}><MdOutlineDragHandle /></TableCell>
                              {/* <th scope='row'>{index + 1}</th> */}
                              <TableCell>{name}</TableCell>
                              <TableCell>{username}</TableCell>
                              <TableCell>{email}</TableCell>
                              <TableCell>{phone}</TableCell>
                              <TableCell>{website}</TableCell>
                              <TableCell className='action'>
                                <Tooltip arrow title='view item'>
                                  <Link to={'/home/invite'}>
                                    <IconButton color='secondary'>
                                      <VisibilityIcon />
                                    </IconButton>
                                  </Link>
                                </Tooltip>
                                <Tooltip arrow title='Delete item'>
                                  <IconButton color='error' onClick={() => { deleteQuote(id) }}>
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              </TableCell>
                            </TableRow>
                          )}
                        </Draggable>
                      )
                    })
                  }
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>


  );
}

export default Invite