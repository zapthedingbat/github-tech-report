async function analyzeDependencies(repository, filePaths, getFileContentsFn) {
  // Look for node package.json
  const packageFilePath = filePaths.find(p => p.endsWith('package.json'));
  if(packageFilePath){
    
    // package.json found
    const packageFileContents = await getFileContentsFn(packageFilePath);
    const packageJson = JSON.parse(packageFileContents);

    const dependencies = Object.getOwnPropertyNames(Object.assign(
      {},
      packageJson.dependencies,
      packageJson.devDependencies,
      packageJson.peerDependencies,
      packageJson.bundledDependencies,
      packageJson.optionalDependencies,
      packageJson.engines
    ));

    dependencies.forEach(dependency => {
      process.stdout.write(`"${repository}","${packageJson.name}","${dependency}"\n`);
    });

    return;
  } else {
    // package.json missing. Not a node code-base?
  }
}

module.exports = {
  analyzeDependencies: analyzeDependencies
}
