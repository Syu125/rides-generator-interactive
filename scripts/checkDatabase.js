// retrieve form data from the server
console.log("Retrieving from database...");
(async () => {
    const rawResponse = fetch('https://syu125.github.io/rides-generator-interactive/posts');
    const content = await rawResponse.json();
    console.log(content);
});
        