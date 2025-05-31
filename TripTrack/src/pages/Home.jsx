import React from "react";
export default function Home() {
  const styles = {
    homeContainer: {
      backgroundImage:
        'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1470&q=80")',
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 20px",
      boxSizing: "border-box",
      color: "black",
      flexDirection: "column",
      textAlign: "center",
    },
    content: {
      maxWidth: "900px",
      width: "100%",
    },
    heading: {
      fontSize: "4rem",
      fontWeight: "900",
      marginBottom: "20px",
      color: "black",
    },
    description: {
      fontSize: "1.5rem",
      fontWeight: "normal",
      marginBottom: "40px",
      lineHeight: "1.6",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "30px",
      marginTop: "20px",
    },
    gridItem: {
      padding: "10px",
      fontSize: "1.1rem",
      lineHeight: "1.5",
      textAlign: "left",
    },
    subHeading: {
      fontWeight: "700",
      marginBottom: "10px",
      fontSize: "1.3rem",
    },
    button: {
      padding: "12px 30px",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#1e90ff",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginTop: "40px",
      display: "block",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };

  return (
    <div style={styles.homeContainer}>
      <div style={styles.content}>
        <h1 style={styles.heading}>Welcome to Travel Budget Planner ✈️🧳🌍</h1>

        <p style={styles.description}>
          Plan and track your travel expenses smartly. Our tool helps you manage your budget, categorize expenses,
          convert currencies, and much more – all in one place.
        </p>

        <div style={styles.gridContainer}>
          <div style={styles.gridItem}>
            <h3 style={styles.subHeading}>Context</h3>
            <p>
              Traveling can often lead to unexpected expenses, making it essential for travelers to plan and manage their budgets effectively.
              A travel budget planning tool can assist users in tracking their expenses, categorizing their spending, and ensuring they stay within their financial limits.
            </p>
          </div>

          <div style={styles.gridItem}>
            <h3 style={styles.subHeading}>Benefits</h3>
            <p>
              By providing a clear overview of budget allocation and spending habits, this tool empowers travelers to make informed financial decisions
              and enjoy their trips without the stress of overspending.
            </p>
          </div>

          <div style={styles.gridItem}>
            <h3 style={styles.subHeading}>Project Goal</h3>
            <p>
              Develop an intuitive travel budget planning tool that allows users to efficiently manage their travel expenses,
              set budget goals, and analyze their spending patterns — all designed for a seamless user experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
