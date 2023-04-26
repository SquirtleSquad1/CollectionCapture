import axios from 'axios';
import { createRouteAction, redirect } from 'solid-start';

const Signup = () => {
    const [, { Form }] = createRouteAction(async (formData) => {
        const username = formData.get("username");
        const password = formData.get("password");
        try {
          const response = await axios.post('/api/signupUser', {
            username,
            password
          });
          if (response.status === 200) {
            return redirect('/login');
          }
        } catch (error) {
          console.error(error);
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
