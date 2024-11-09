import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <div className={styles.containerBox}> {}
        <h1 className={styles.title}>Welcome to Swift</h1>
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputBox}>
              <h2 className={styles.login}>Login</h2>
              <input type="text" placeholder="Email" required />
              <i className="bx bx-user"></i>
            </div>
            <div className={styles.inputBox}>
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt"></i>
            </div>
            <div className={styles.rememberForgot}>
              <a href="#">Forgot password?</a>
            </div>
            <button type="submit" className={styles.btn}>Login</button>
            <div className={styles.registerLink}>
              <p>Don't have an account? <a href="#">Register</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
