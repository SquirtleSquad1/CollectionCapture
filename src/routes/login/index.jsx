import axios from 'axios';
import { createRouteAction, redirect } from 'solid-start';
const Login = () => {
  const [_, { Form }] = createRouteAction(async (formData) => {
    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const response = await axios.post('/api/loginUser', {
        username,
        password
      });
      if (response.status === 200) {
        return redirect('/');
      }
    } catch (error) {
      console.error(error);
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
      <button type='submit'>Login</button>
    </Form>
  </div>
  )
}


export default Login
