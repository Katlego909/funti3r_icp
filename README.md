<!-- @format -->

# `funti3r`

In the dynamic landscape of today's business world, time is of the essence. Funti3r is here to revolutionize the way SMEs and Corporates manage their tasks and streamline their operations. Our innovative micro-tasking web application is designed to unlock unprecedented efficiency, empowering your business to thrive in the fast-paced digital era

## Running the project locally

Install some dependencies

```bash
npm i -g ic-mop
```

Then

```bash
  npm install
```

Run the command to list a list identities

```bash
#lists the current identities
  dfx identity list
```

Make sure that you see at least users two, namely `anonymous` and `user1`

Otherwise create a new identity by running

```bash
  dfx identity new user1
```

Run the command below to start the icp local server

```bash
# Starts the replica, running in the background
dfx start --background  --clean
```

Then run the script `deploy.sh` using

```bash
 bash ./deploy.sh
```
