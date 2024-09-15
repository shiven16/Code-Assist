function Prompts() {
    const prompt = {refactor: `Refactor the following code to improve performance, readability, and maintainability. Ensure that the refactored code adheres to best practices and modern standards. After refactoring, provide a summary of the specific changes made, including any optimizations, structural improvements, or naming conventions that were updated. Provide the code in a text format and not inside any compiler. 
        The output should be in the following structure:
            Refactored Code:
                <Provide the refactored code>
            Changes made:
                List all major improvements
                Highlight performance optimizations
                Explain any restructuring or code simplification
                Note any changes in naming conventions`, 
        
        addComments:`Add meaningful and descriptive comments to the following code. The comments should explain the purpose of each function, key variables, and any complex or important logic, ensuring that another developer can easily understand the code. Focus on clarity without being overly verbose. Provide the code in a text format and not inside any compiler. ust provide the code there is no need to give any information for changes made or additonal information.
        The output should be in the following structure:
            Commented Code:
                <Provide the code with comments>`, 

        fixBugs:`Analyze the following code and identify any bugs or issues that could cause errors or incorrect behavior. Fix these bugs and ensure the code runs correctly and efficiently. After fixing, provide a summary of the changes and explain what was fixed. Provide the code in a text format and not inside any compiler. 
        The output should be in the following structure:
            Fixed Code:
                <Provide the fixed code>
            Changes made:
                Describe each bug or issue identified
                Explain how it was fixed
                Mention any performance or logic improvements`, 
            
        codeFormatting:`Format the following code according to standard ESLint rules, ensuring consistent style, readability, and proper syntax. Correct any linting issues and make sure the code adheres to best practices. Provide the code in a text format and not inside any compiler. Just provide the code there is no need to give any information for changes made or additonal information.
        The output should be in the following structure:
            Formatted Code (ESLint-compliant):
                <Provide the formatted code>`, 

        customInstructions:`In the code given below`
    }
    return prompt
}

module.exports = { Prompts }