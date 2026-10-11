module.exports.generatePrompt = function (idea, selected) {
  const includeFlowchart = !selected || selected.length === 0 || selected.includes('flowchart');
  const includeTechStack = !selected || selected.length === 0 || selected.includes('tech-stack');
  const includeBash = !selected || selected.length === 0 || selected.includes('bash-command');

  const instructions = [
    '1. Understand the project scope, requirements, technical details, and constraints.'
  ];

  if (includeFlowchart) {
    instructions.push('2. Break the project into clear phases (e.g., Planning, Design, Development, Testing, Deployment, Maintenance).');
    instructions.push('3. Within each phase, list specific tasks in logical order.');
    instructions.push('4. In planning phase you have to provide info like name of various task in planning phase, their needs i.e. why to conduct them, resources and tools to help them in planning.');
    instructions.push('5. In designing you have to provide info for every part like for database design you have to further tell the user the entities gonna used and explain their relation with other, similar for Api design list all the api points going to be used and for other parts too.');
    instructions.push("6. In implementation phase be specific for every feature and functionality don't just cover them in a single umbrella, for eg in frontend list all the feature and functionality need to be implemented if any.");
    instructions.push('7. In testing phase tell all the need of every part and tools to help in testing.');
    instructions.push('8. In deployment phase list the things he should have done before deployment and then provide deployment tools.');
  }

  if (includeTechStack) {
    instructions.push('9. Suggest an optimal and market relevant tech stack (frontend, backend, database, hosting, other tools) based on requirements and constraints.');
  }

  if (includeBash) {
    instructions.push('10. Provide the bash command to generate the entire project folder with all the dependencies get installed.');
    instructions.push('11. Ensure bash commands are valid and work as expected.');
  }

  instructions.push('12. Output the results as a json object with following format and structure and no extra text.');

  const jsonFields = [];

  if (includeFlowchart) {
    jsonFields.push(`        "workflow": {
            "planning": [ {"label": "stage name", "details": "info about the stage in brief", "tools": []} ],
            "design": [ {"label": "stage name", "details": "info about the stage in brief", "design": [{}]} ],
            "implementation": [ {"label": "stage name", "details": "info about the stage in brief", "features": [{}]} ],
            "testing": [ {"label": "stage name", "details": "info about the stage in brief", "tools": []} ],
            "deployment": [ {"label": "stage name", "details": "info about the stage in brief", "tools": []} ],
            "maintenance": [ {"label": "stage name", "details": "info about the stage in brief", "tools": []} ]
        }`);
  }

  if (includeTechStack) {
    jsonFields.push(`        "tech_stack": {
            "frontend": [{"technology": "name", "reason_to_use": "why to choose it for this project", "alternatives": "suggest other alternatives", "important": "grade it from 1 to 5"}],
            "backend": [],
            "database": [],
            "hosting": [],
            "other tools": []
        }`);
  }

  if (includeBash) {
    jsonFields.push(`        "bash_command": {
            "shebang": [],
            "# Create main project folder": [],
            "# Create frontend and backend folders": [],
            "# Initialize React frontend": [],
            "# Install frontend dependencies": [],
            "# create all the important folders for frontend": [],
            "# Go back and initialize backend": [],
            "# create .env file for backend": [],
            "# create .gitignore file for backend": [],
            "# create all the important folders for backend": [],
            "# Install backend dependencies": [],
            "# Install backend dev dependencies": [],
            "# Go back to root": [],
            "# Create README.md": [],
            "# Add documentation": []
        }`);
  }

  const formatStructure = `{\n${jsonFields.join(',\n')}\n    }`;

  return `You are an expert software project planner and architect. 
You will be provided a project Idea and Your job is to: 
${instructions.join('\n')}

CRITICAL INSTRUCTIONS FOR JSON OUTPUT:
- Output ONLY valid JSON format without any additional text, explanations, or markdown formatting and escape sequence
- Ensure all brackets and braces are properly closed
- For the bash command, use proper JSON escaping
- Make sure the JSON is completely valid and parsable using a JSON parser
- Remove trailing commas

Here is the format:
${formatStructure}
Here is the project idea:
idea : ${idea}
`;
};
