const algoliasearch = require('algoliasearch');
const config = require("./../config/config.js");
const { customError } = require("../error/error.js");

//------------------------------
//------------------------------

class Algolia {

  static getConection() {
    try {
      
      return { stories: this._stories, perfil: this._perfil, mostLiked: this._stories_rating_desc,
        mostViewed: this._stories_views_desc };

    } catch (e) {
      throw customError("Error Algolia", "getConection", 500, e);
    }
  }

  // this function create Algolia object if it dont exist yet
  static createConection() {
    try {
      if (this._stories) {
        return Algolia.getConection();
      }

      console.log("index.appID "+config.get("index.appID") +" index.apiKey "+ config.get("index.apiKey"));
      // initialize Algolia
      const client = algoliasearch(config.get("index.appID"), config.get("index.apiKey"));

      this._stories = client.initIndex(config.get("index.stories"));
      this._stories.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: [
          'title', 'categories'
        ],
        // Define business metrics for ranking and sorting
        customRanking: [
          //'desc(views)'
        ],
        // Set up some attributes to filter results on
        attributesForFaceting: [
          'title', 'categories'
        ],
        // replicas: [
        //   'stories_rating_desc',
        //   'stories_views_desc'
        // ]
      });

      this._stories_rating_desc = client.initIndex(config.get("index.mostLiked"));
      this._stories_rating_desc.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: [
          'title', 'categories'
        ],
        // Define business metrics for ranking and sorting
        customRanking: [
          'desc(rate)'
        ],
        // Set up some attributes to filter results on
        attributesForFaceting: [
          
        ]
      });

      this._stories_views_desc = client.initIndex(config.get("index.mostViewed"));
      this._stories_views_desc.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: [
          'title', 'categories'
        ],
        // Define business metrics for ranking and sorting
        customRanking: [
          'desc(views)'
        ],
        // Set up some attributes to filter results on
        attributesForFaceting: [
          
        ]
      });

      this._perfil = client.initIndex(config.get("index.perfil"));

      this._perfil.setSettings({
        // Select the attributes you want to search in
        searchableAttributes: [
        ],
        // Define business metrics for ranking and sorting
        customRanking: [
          //'desc(download)'
        ],
        // Set up some attributes to filter results on
        attributesForFaceting: [
          
        ]
      });

      return { stories: this._stories,
                perfil: this._perfil,
                mostLiked: this._stories_rating_desc,
                mostViewed: this._stories_views_desc };
      
    } catch (e) {
      throw customError("Error Algolia", "createConection", 500, e);
    }
  }
}

//------------------------------
//------------------------------

module.exports.Algolia = Algolia;
