const { RESTDataSource } = require("apollo-datasource-rest");

/**
 * RESTDataSource class automatically caches responses from REST resources
 * with no additional setup.
 */
class LaunchAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.spacexdata.com/v2/";
  }

  /**
   * Sends a GET request to https://api.spacexdata.com/v2/launches
   */
  async getAllLaunches() {
    const response = await this.get("launches");

    return Array.isArray(response)
      ? response.map((launch) => this.launchReducer(launch))
      : [];
  }

  async getLaunchById({ launchId }) {
    const response = await this.get("launches", { flight_number: launchId });
    return this.launchReducer(response[0]);
  }

  getLaunchesByIds({ launchIds }) {
    return Promise.all(
      launchIds.map((launchId) => this.getLaunchById({ launchId }))
    );
  }

  /**
   * Transforms data from the REST API into this schema-defined shape.
   * Notice that isBooked field isn't set. That's because the Space-X API
   * doesn't know which trips a user has booked! That field will be populated
   * by our other data source, which connects to a SQLite database.
   */
  launchReducer(launch) {
    return {
      id: launch.flight_number || 0,
      cursor: `${launch.launch_date_unix}`,
      site: launch.launch_site && launch.launch_site.site_name,
      mission: {
        name: launch.mission_name,
        missionPatchSmall: launch.links.mission_patch_small,
        missionPatchLarge: launch.links.mission_patch,
      },
      rocket: {
        id: launch.rocket.rocket_id,
        name: launch.rocket.rocket_name,
        type: launch.rocket.rocket_type,
      },
    };
  }
}

module.exports = LaunchAPI;
