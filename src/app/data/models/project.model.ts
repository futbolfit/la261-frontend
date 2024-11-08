export class Project {
  project_name: string;

  client_name: string;
  client_description: string;
  client_presenter_name: string;
  client_presenter_role: string;
  client_review: string;

  project_title: string;
  project_description: string;
  project_details: string[];
  main_image_url: string;
  images_urls: string[];
  videos_urls: string[];

  constructor(
    project_name: string,

    client_name: string,
    client_description: string,
    client_presenter_name: string,
    client_presenter_role: string,
    client_review: string,

    project_title: string,
    project_description: string,
    project_details: string[],
    main_image_url: string,
    images_urls: string[],
    videos_urls: string[],
  )
    {
    this.project_name = project_name;

    this.client_name = client_name;
    this.client_description = client_description;
    this.client_presenter_name = client_presenter_name;
    this.client_presenter_role = client_presenter_role;
    this.client_review = client_review;

    this.project_title = project_title;
    this.project_description = project_description;
    this.project_details = project_details;
    this.main_image_url = main_image_url;
    this.images_urls = images_urls;
    this.videos_urls = videos_urls;
  }

  static fromJson(json: Record<string, any>): Project {
    return new Project(
      json['project_name'],

      json['client_name'],
      json['client_description'],
      json['client_presenter_name'],
      json['client_presenter_role'],
      json['client_review'],

      json['project_title'],
      json['project_description'],
      json['project_details'],
      json['main_image_url'],
      json['images_urls'],
      json['videos_urls'],
    );
  }
}
