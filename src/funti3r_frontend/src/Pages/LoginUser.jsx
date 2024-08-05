import React from 'react';

const LoginUser = ({ funti3r_backend }) => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await funti3r_backend.loginUser();
            alert('User logged in successfully');
        } catch (error) {
            console.error('Failed to log in user', error);
        }
    };

    return (
        <div>
            <h2>Login as User</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginUser;
