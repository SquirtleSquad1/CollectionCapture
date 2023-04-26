import axios from 'axios';
import { createRouteAction, redirect } from 'solid-start';

const Signup = () => {
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
        console.log(login)
      return redirect('/')
    }
  });
  
  return (
    <div class="flex flex-col">
      <h1 class="text-4xl">Signup</h1>
      <Form>
        <input type="text" name="username" id="username" placeholder='Username'/>
        <input type="password" name="password" id="password" placeholder='Password' />
        <input class='mt-6' type="submit" value="Sign up" />
      </Form>
    </div>
  );
};

export default Signup;
