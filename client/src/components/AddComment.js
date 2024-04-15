import React, { useState } from 'react'

const AddComment = ({articleName, setArticleInfo}) => {
  const [userName, setUserName] = useState('');
  const [commentText, setCommentText] = useState('');
  const addComments = async ()=>{
    const result = await fetch(`/api/articles/${articleName}/add-comments`,  
    {method: 'post',
    body: JSON.stringify({userName, text: commentText}),
    headers:{
        "Content-Type": "application/json",

    },
    })
    const body = await result.json()
    setArticleInfo(body);
    setCommentText('')
    setUserName('')
  }
  return (
    <form className='shadow rounded px-8 pt-6 pb-8 mb-4'>
        <h3 className='text-xl font-bold mb-4 text-gray-900'>Add a comment</h3>
        <label className='block text-gray-700 text-sm font-bold mb-2'>Name :</label>
        <input type='text' className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
         focus:outline-none leading-tight focus:shadow-outline'
         value={userName}
         onChange={(e)=> setUserName(e.target.value)}
         />
        <label className='block text-gray-700 text-sm font-bold mb-2'>comment :</label>
        <textarea
        rows='4'
        cols='5'
        onChange={(e)=> setCommentText(e.target.value)}
        value={commentText}

        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700
         focus:outline-none leading-tight focus:shadow-outline'
         /> 
         <button onClick={addComments}className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
            Add Comment
         </button>

    </form>
  )
}

export default AddComment