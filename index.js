const github = require("@actions/github");
const core = require("@actions/core");

async function run() {
  try {
    const token = process.env.token;
    const octokit = github.getOctokit(token);
    const owner = github.context.repo.owner;
    const repo = github.context.repo.repo;
    core.debug(`GET /repos/${owner}/${repo}/actions/caches`);
    const res = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/caches",
      {
        owner: owner,
        repo: repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );
    core.debug("Response:");
    core.debug(res);
    core.debug("Data:");
    const caches = res.data;
    core.debug(caches);
    core.info(`Found ${caches.total_count} caches`);
    if (caches.total_count == 0) {
      core.info("Found no caches, terminating");
      return;
    }
    caches.actions_caches.forEach(async function (action) {
      core.debug(`DELETE /repos/${owner}/${repo}/actions/caches/${action.id}`);
      await octokit.request(
        "DELETE /repos/{owner}/{repo}/actions/caches/{cache_id}",
        {
          owner: owner,
          repo: repo,
          cache_id: action.id,
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );
      core.info(`Deleted cache ${action.id}`);
    });
  } catch (error) {
    core.setFailed(error.stack);
  }
}

run();
