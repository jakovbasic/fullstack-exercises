const loginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (

  <form onSubmit={handleLogin}>
    <h2>log in</h2>
    <div>
        username
      <input
        id="username"
        type="text"
        value={username}
        name="Username"
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>
    <div>
        password
      <input
        id="password"
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
)

export default loginForm