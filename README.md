# 🧪 CodeceptJS API Testing Examples

CodeceptJS API testing examples for Star Wars API and YouTube with comprehensive CI/CD pipeline.

## 🚀 Features

- YouTube website availability testing
- Star Wars API testing
- Automated CI/CD with GitHub Actions
- Docker containerization
- Test reporting and artifacts
- Scheduled daily health checks

## 📋 Prerequisites

- Node.js 18+ or 20+
- npm or yarn
- Docker (optional, for containerized testing)
- Git (for CI/CD)

## 🛠️ Installation

```bash
npm install
```

## 🧪 Running Tests

### Local Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:youtube
npm run test:starwars

# Run with verbose output
npm run test:verbose

# Run with step-by-step output
npm run test:steps

# Run with spec reporter (CI format)
npm run test:ci
```

### Docker Testing

```bash
# Build and run all tests
docker-compose up codeceptjs-tests

# Run specific test suites
docker-compose up youtube-tests
docker-compose up starwars-tests

# Build Docker image manually
docker build -t codeceptjs-tests .
docker run codeceptjs-tests
```

## 🔄 CI/CD Pipeline

### GitHub Actions

The project includes a comprehensive GitHub Actions workflow (`.github/workflows/ci.yml`) that:

- **Triggers on**: Push to main/master, Pull Requests, Manual dispatch, Daily schedule (9 AM UTC)
- **Tests on**: Node.js 18.x and 20.x
- **Includes**:
  - Dependency installation and caching
  - YouTube and Star Wars API tests
  - Test report generation
  - Artifact upload (test results retained for 30 days)
  - External API health checks
  - GitHub Pages deployment for test reports
  - Comprehensive notifications and summaries

### Setting up CI/CD

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit with CI/CD setup"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **Enable GitHub Actions**: Actions will automatically run on push

3. **Enable GitHub Pages** (optional, for test reports):
   - Go to Settings > Pages
   - Source: GitHub Actions
   - The workflow will publish test reports to `https://yourusername.github.io/your-repo/test-reports/`

### Workflow Jobs

1. **Test Job**: Runs CodeceptJS tests on multiple Node.js versions
2. **Health Check Job**: Verifies external API availability
3. **Notify Job**: Provides comprehensive test summaries

## 📊 Test Reports

- **Local**: Test results saved to `./output/` directory
- **CI/CD**: Artifacts uploaded to GitHub Actions
- **GitHub Pages**: Public test reports (if enabled)

## 🐳 Docker Commands

```bash
# Development
docker-compose up --build

# Production
docker build -t codeceptjs-tests .
docker run --rm codeceptjs-tests

# With volume mapping for results
docker run --rm -v $(pwd)/output:/app/output codeceptjs-tests
```

## 🔧 Configuration

- **CodeceptJS Config**: `codecept.conf.js`
- **CI/CD Workflow**: `.github/workflows/ci.yml`
- **Docker**: `Dockerfile` and `docker-compose.yml`
- **Dependencies**: `package.json`

## 🚨 Troubleshooting

### SSL Issues
The project handles SSL certificate issues with:
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Test Failures
- Check external API availability
- Verify network connectivity
- Review test logs in GitHub Actions

## 📈 Monitoring

- **Daily Health Checks**: Automated via GitHub Actions schedule
- **API Status Monitoring**: Built into CI/CD pipeline
- **Test History**: Available in GitHub Actions runs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and add tests
4. Run tests locally
5. Submit a pull request

CI/CD will automatically run tests on your PR!
