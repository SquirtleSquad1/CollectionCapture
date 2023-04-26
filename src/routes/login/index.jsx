import axios from 'axios';
import { createRouteAction, redirect } from 'solid-start';
const Login = () => {
  const [, { Form }] = createRouteAction(async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    const login = await axios.post('/user/login', {
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
          username,
          password
        }
    })
    if(login) {
      return redirect('/')
    }
  });

  return (
  <div class="flex flex-col">
    <h1 class="text-xxl">Login</h1>
    <Form>
      <label for="username">Username</label>
      <input type="text" name="username" id="username" />
      <label for="password">Password</label>
      <input type="password" name="password" id="password" />
    </Form>
  </div>
  )
}


export default Login
