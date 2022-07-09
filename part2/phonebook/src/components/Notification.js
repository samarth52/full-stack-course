const Notification = ({ messageStatus }) => {
  if (messageStatus === null) {
    return null
  }

  const messageStyle = (isError) => ({
    color: isError ? 'red' : 'green',
    background: 'lightgray',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  })

  return (
    <div style={messageStyle(messageStatus.isError)}>
      {messageStatus.message}
    </div>
  )
}

export default Notification