import * as Resources from './resources';
import request, { RequestOptions, ClientConfigOptions } from '../request';
import { subscribeToEvents, EventsSubscription } from '../subscribeToEvents';
import pollJobResult from '../pollJobResult';

export class Client {
  static readonly defaultBaseUrl = 'https://site-api.datocms.com';

  roles: Resources.Role;
  users: Resources.User;
  ssoUsers: Resources.SsoUser;
  auditLogEvents: Resources.AuditLogEvent;
  menuItems: Resources.MenuItem;
  itemTypes: Resources.ItemType;
  fields: Resources.Field;
  fieldsets: Resources.Fieldset;
  session: Resources.Session;
  accessTokens: Resources.AccessToken;
  plugins: Resources.Plugin;
  jobResults: Resources.JobResult;
  subscriptionLimits: Resources.SubscriptionLimit;
  subscriptionFeatures: Resources.SubscriptionFeature;
  buildEvents: Resources.BuildEvent;
  items: Resources.Item;
  itemVersions: Resources.ItemVersion;
  uploads: Resources.Upload;
  uploadRequest: Resources.UploadRequest;
  scheduledPublication: Resources.ScheduledPublication;
  scheduledUnpublishing: Resources.ScheduledUnpublishing;
  searchResults: Resources.SearchResult;
  environments: Resources.Environment;
  maintenanceMode: Resources.MaintenanceMode;
  webhooks: Resources.Webhook;
  webhookCalls: Resources.WebhookCall;
  buildTriggers: Resources.BuildTrigger;
  itemTypeFilters: Resources.ItemTypeFilter;
  uploadFilters: Resources.UploadFilter;
  siteInvitations: Resources.SiteInvitation;
  editingSessions: Resources.EditingSession;
  ssoGroups: Resources.SsoGroup;
  ssoSettings: Resources.SsoSettings;
  whiteLabelSettings: Resources.WhiteLabelSettings;
  publicInfo: Resources.PublicInfo;
  dailyUsages: Resources.DailyUsage;
  usageCounters: Resources.UsageCounter;
  uploadTags: Resources.UploadTag;
  uploadSmartTags: Resources.UploadSmartTag;
  site: Resources.Site;
  workflows: Resources.Workflow;

  private config: ClientConfigOptions;
  private eventsSubscription?: EventsSubscription;

  constructor(config: ClientConfigOptions) {
    this.config = config;
    this.roles = new Resources.Role(this);
    this.users = new Resources.User(this);
    this.ssoUsers = new Resources.SsoUser(this);
    this.auditLogEvents = new Resources.AuditLogEvent(this);
    this.menuItems = new Resources.MenuItem(this);
    this.itemTypes = new Resources.ItemType(this);
    this.fields = new Resources.Field(this);
    this.fieldsets = new Resources.Fieldset(this);
    this.session = new Resources.Session(this);
    this.accessTokens = new Resources.AccessToken(this);
    this.plugins = new Resources.Plugin(this);
    this.jobResults = new Resources.JobResult(this);
    this.subscriptionLimits = new Resources.SubscriptionLimit(this);
    this.subscriptionFeatures = new Resources.SubscriptionFeature(this);
    this.buildEvents = new Resources.BuildEvent(this);
    this.items = new Resources.Item(this);
    this.itemVersions = new Resources.ItemVersion(this);
    this.uploads = new Resources.Upload(this);
    this.uploadRequest = new Resources.UploadRequest(this);
    this.scheduledPublication = new Resources.ScheduledPublication(this);
    this.scheduledUnpublishing = new Resources.ScheduledUnpublishing(this);
    this.searchResults = new Resources.SearchResult(this);
    this.environments = new Resources.Environment(this);
    this.maintenanceMode = new Resources.MaintenanceMode(this);
    this.webhooks = new Resources.Webhook(this);
    this.webhookCalls = new Resources.WebhookCall(this);
    this.buildTriggers = new Resources.BuildTrigger(this);
    this.itemTypeFilters = new Resources.ItemTypeFilter(this);
    this.uploadFilters = new Resources.UploadFilter(this);
    this.siteInvitations = new Resources.SiteInvitation(this);
    this.editingSessions = new Resources.EditingSession(this);
    this.ssoGroups = new Resources.SsoGroup(this);
    this.ssoSettings = new Resources.SsoSettings(this);
    this.whiteLabelSettings = new Resources.WhiteLabelSettings(this);
    this.publicInfo = new Resources.PublicInfo(this);
    this.dailyUsages = new Resources.DailyUsage(this);
    this.usageCounters = new Resources.UsageCounter(this);
    this.uploadTags = new Resources.UploadTag(this);
    this.uploadSmartTags = new Resources.UploadSmartTag(this);
    this.site = new Resources.Site(this);
    this.workflows = new Resources.Workflow(this);
  }

  get baseUrl() {
    return this.config.baseUrl || Client.defaultBaseUrl;
  }

  request<T>(options: RequestOptions) {
    return request<T>({
      ...this.config,
      ...options,
      baseUrl: this.baseUrl,
      preCallStack: new Error().stack,
      fetchJobResult: (jobId: string) => {
        if (this.eventsSubscription) {
          return this.eventsSubscription.waitJobResult(jobId);
        }
        return pollJobResult(() => this.jobResults.rawFind(jobId));
      },
    });
  }

  async subscribeToEvents(): Promise<void> {
    if (!this.config.apiToken) {
      throw new Error('Missing API token!');
    }

    const { data: site } = await this.site.rawFind();

    this.eventsSubscription = await subscribeToEvents(
      `${this.baseUrl}/pusher/authenticate`,
      this.config.apiToken,
      this.config.environment
        ? `private-site-${site.id}-environment-${this.config.environment}`
        : `private-site-${site.id}`,
    );
  }

  get eventsChannel() {
    if (!this.eventsSubscription) {
      return;
    }

    return this.eventsSubscription.channel;
  }

  unsubscribeToEvents() {
    if (!this.eventsSubscription) {
      return;
    }

    return this.eventsSubscription.unsubscribe();
  }
}
