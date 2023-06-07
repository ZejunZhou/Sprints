import React from "react";
import "./App.css";

function App() {
  const agileResources = [
    {
      name: '"What is Agile methodology?" by Agile Alliance',
      url: "https://www.agilealliance.org/agile101/",
      description:
        "This article provides an overview of Agile methodology, including its origins, principles, and key practices. It also discusses the benefits of Agile and how it differs from traditional project management approaches.",
    },
    {
      name: "Agile Vs Waterfall Methodology: Which Is Right For Your Project?",
      url: "https://www.forbes.com/advisor/business/agile-vs-waterfall-methodology/",
      description:
        "This Forbes article compares and contrasts Agile and Waterfall methodologies, examining the pros and cons of each approach. It also offers guidance on how to determine which methodology is best suited for a given project based on its requirements and constraints.",
    },
    {
      name: "What is Scrum?",
      url: "https://www.scrum.org/resources/what-scrum-module",
      description:
        "This Scrum.org article provides an overview of the Scrum framework, including its roles, events, artifacts, and values. It also explains how Scrum can be used in different types of projects and industries to increase collaboration, transparency, and agility. It also offers guidance on how to determine which methodology is best suited for a given project based on its requirements and constraints.",
    },
    {
      name: "A Brief Overview of Planning Poker",
      url: "https://www.atlassian.com/blog/platform/a-brief-overview-of-planning-poker",
      description:
        "This Atlassian article provides an overview of Planning Poker, a collaborative estimation technique used in Agile software development. It explains how the technique works, its benefits, and provides tips on how to effectively use it in a team setting.",
    },
  ];

  const devopsResources = [
    {
      name: "DevOps Institute",
      url: "https://devopsinstitute.com/",
      description:
        "A global organization that provides education and certification programs for DevOps professionals.",
    },
    {
      name: "What is DevOps? Your Guide to CI/CD and More ",
      url: "https://www.atlassian.com/devops",
      description:
        "This Atlassian article explains what DevOps is and how it can improve software development and delivery. It covers key DevOps concepts, such as continuous integration/continuous delivery (CI/CD), and provides guidance on how to implement DevOps practices in your organization.",
    },
    {
      name: "The DevOps Handbook",
      url: "https://itrevolution.com/book/the-devops-handbook/",
      description:
        "A comprehensive guide to implementing DevOps in organizations, written by industry experts.",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f9deff", minHeight: "100vh" }}>
      <div className="container">
        <h1 className="h1Heading">Agile and DevOps Resources</h1>
        <div className="agileSection">
          <h2 className="h1Agile">Agile</h2>
          <ul>
            {agileResources.map((resource) => (
              <li key={resource.url}>
                <a href={resource.url} target="_blank" rel="noreferrer">
                  {resource.name}
                </a>{" "}
                - {resource.description}
              </li>
            ))}
          </ul>
        </div>
        <div className="devSection">
          <h2 className="h1Devops">DevOps</h2>
          <ul>
            {devopsResources.map((resource) => (
              <li key={resource.url}>
                <a href={resource.url} target="_blank" rel="noreferrer">
                  {resource.name}
                </a>{" "}
                - {resource.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
