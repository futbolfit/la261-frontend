export class Project {
  project_name: string;
  client: string;
  project_title: string;
  project_description: string;
  project_details: string[];
  images_urls: string[];
  videos_urls: string[];

  constructor(
    project_name: string,
    client: string,
    project_title: string,
    project_description: string,
    project_details: string[],
    images_urls: string[],
    videos_urls: string[],
  )
    {
    this.project_name = project_name;
    this.client = client;
    this.project_title = project_title;
    this.project_description = project_description;
    this.project_details = project_details;
    this.images_urls = images_urls;
    this.videos_urls = videos_urls;
  }

  static fromJson(json: Record<string, any>): Project {
    return new Project(
      json['project_name'],
      json['client'],
      json['project_title'],
      json['project_description'],
      json['project_details'],
      json['images_urls'],
      json['videos_urls'],
    );
  }
}
